import { EventEmitter as Emitter } from "eventemitter3";

export class AccountUpdateEvent {
  static type = "AccountUpdate";
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export class MarketUpdateEvent {
  static type = "MarketUpdate";
  ids: Set<string>;
  constructor(ids: Set<string>) {
    this.ids = ids;
  }
}

export class EventEmitter {
  private emitter = new Emitter();

  onMarket(callback: (args: MarketUpdateEvent) => void) {
    this.emitter.on(MarketUpdateEvent.type, callback);
    console.log("emitter onMARKET")
    return () => this.emitter.removeListener(MarketUpdateEvent.type, callback);
  }

  onAccount(callback: (args: AccountUpdateEvent) => void) {
    this.emitter.on(AccountUpdateEvent.type, callback);
    console.log("emitter onAccount")
    return () => this.emitter.removeListener(AccountUpdateEvent.type, callback);
  }

  raiseAccountUpdated(id: string) {
    console.log("emitter raiseAccountUpdated")
    this.emitter.emit(AccountUpdateEvent.type, new AccountUpdateEvent(id));
  }

  raiseMarketUpdated(ids: Set<string>) {
    console.log("emitter raiseMarketUpdated")
    this.emitter.emit(MarketUpdateEvent.type, new MarketUpdateEvent(ids));
  }
}
