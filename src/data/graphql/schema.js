import merge from 'lodash/merge';

/** * Queries ** */
import {
  schema as userSchema,
  queries as userQueries,
  resolvers as userResolver,
} from './users/getUsers';

import {
  schema as subjectSchema,
  queries as subjectQueries,
  resolvers as subjectResolver,
} from './subjects/QueriesSubjects';

import {
  schema as equipmentTypeSchema,
  queries as equipmentTypeQueries,
  resolvers as equipmentTypeResolver,
} from './equipmentsInfo/getEquipInfo';

import {
  schema as equipmentSchema,
  queries as equipmentQueries,
  resolvers as equipmentResolver,
} from './equipmentsInfo/getEquipDetail';

import {
  schema as equipmentStatusSchema,
  queries as equipmentStatusQueries,
  resolvers as equipmentStatusResolver,
} from './equipmentStatus/QueriesEquipmentStatus';

/** * Mutations ** */
import {
  schema as mutationUserSchema,
  mutation as userMutation,
  resolvers as mutationUserResolver,
} from './users/createUser';

import {
  mutation as subjectMutation,
  resolvers as mutationSubResolver,
} from './subjects/MutationSubject';

import {
  schema as aidHistorySchema,
  queries as aidHistoryQueries,
  resolvers as aidHistoryResolver,
} from './aid_histories/QueriesAidHistories';

import {
  mutation as equipDetailMutation,
  resolvers as mutationEquipDetailResolver,
} from './equipmentsInfo/mutationEquipDetail';

import {
  mutation as equipInfoMutation,
  resolvers as mutationEquipInfoResolver,
} from './equipmentsInfo/mutationEquipInfo';

import {
  mutation as equipmentStatusMutation,
  resolvers as mutationEStatusResolver,
} from './equipmentStatus/MutationEquipmentStatus';

import {
  mutation as aidHistoriesMutation,
  resolvers as aidHistoriesResolers,
} from './aid_histories/MutationAidHistories';

/** * Build graphql schema ** */
export const schema = [
  ...userSchema,
  ...mutationUserSchema,
  ...subjectSchema,
  ...equipmentTypeSchema,
  ...equipmentSchema,
  ...aidHistorySchema,
  ...equipmentStatusSchema,
];

export const queries = [
  ...userQueries,
  ...subjectQueries,
  ...equipmentTypeQueries,
  ...equipmentQueries,
  ...aidHistoryQueries,
  ...equipmentStatusQueries,
];

export const mutations = [
  ...userMutation,
  ...subjectMutation,
  ...equipDetailMutation,
  ...equipInfoMutation,
  ...equipmentStatusMutation,
  ...aidHistoriesMutation,
];

export const resolvers = merge(
  userResolver,
  mutationUserResolver,
  subjectResolver,
  mutationSubResolver,
  equipmentTypeResolver,
  equipmentResolver,
  aidHistoryResolver,
  mutationEquipDetailResolver,
  mutationEquipInfoResolver,
  equipmentStatusResolver,
  mutationEStatusResolver,
  aidHistoriesResolers,
);
