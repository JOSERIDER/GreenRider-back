export interface MongooseInterface {
  openConnection(): void;

  closeConnection(): void;
}