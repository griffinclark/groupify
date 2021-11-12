import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Tes {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Tes, TesMetaData>);
  static copyOf(source: Tes, mutator: (draft: MutableModel<Tes, TesMetaData>) => MutableModel<Tes, TesMetaData> | void): Tes;
}