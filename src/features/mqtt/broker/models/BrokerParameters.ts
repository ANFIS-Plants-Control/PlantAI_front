export interface BrokerParameters {
  id: number;
  host: string;
  port: number;
}

export interface CreateBroker {
  host: string;
  port: number;
}
