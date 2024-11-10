export abstract class Action<Environment> {
    abstract execute(input: Environment): Environment;
}