interface LoggerInt {
   logger: (data: string) => void;
   print: () => void;
}

class Logger implements LoggerInt {
   private static instance: Logger;
   private log!: string[];

   constructor() {
      if (Logger.instance === undefined) {
         this.log = [];
         Logger.instance = this;
      }

      return Logger.instance;
   }

   logger(data: string) {
      this.log.push(data);
   }

   print() {
      console.log(`${this.log.length} logs`);
   }
}

export const ErrorLogger = new Logger();
