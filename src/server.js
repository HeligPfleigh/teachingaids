import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { renderToStringWithData } from 'react-apollo';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import passport from './core/passport';
import schema from './data/schema';
import routes from './routes';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { port, auth, databaseUrl } from './config';
import Mongoose from './data/mongoose';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create connect database
Mongoose.connect(databaseUrl, {});

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  req.user = null;
  next(err);
});

if (__DEV__) {
  app.enable('trust proxy');
}

app.use(passport.initialize());

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ ok: false }); }
    return req.logIn(user, (error) => {
      if (error) { return res.status(401).json({ ok: false }); }
      console.log(user);
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn });
      res.status(200).json({ ok: true, isNewUser: user.isNew });
      return next();
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  res.clearCookie('id_token');
  res.redirect('/');
});

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    });

    const store = configureStore({
      user: req.user || null,
    }, {
      cookie: req.headers.cookie,
      apolloClient,
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    data.children = await renderToStringWithData(<App context={context}>{route.component}</App>);
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
    ];
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets.vendor.css) {
      data.cssVendors = [assets.vendor.css];
    }

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Serializing store...');
    }
    data.state = context.store.getState();

    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  res.status(500).json(err);

  // const html = ReactDOM.renderToStaticMarkup(
  //   <Html
  //     title="Internal Server Error"
  //     description={err.message}
  //     styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
  //   >
  //     {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
  //   </Html>,
  // );
  // res.status(err.status || 500);
  // res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
