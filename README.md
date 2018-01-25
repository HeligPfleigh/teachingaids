# System required
  - Install docker or mongodb

# How to use
  - Step 1:
    - Development mode:
      `./deploy development`

    - Staging mode (run production mode on local):
      `./deploy staging`

    - Production Mode (env docker only):
      `./deploy production`

  - Step 2: (Only perform this step when installing a new project)
    - Init database (required install mongo on local machine)
      `npm run database.restore`
