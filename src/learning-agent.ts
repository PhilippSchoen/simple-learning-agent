import { Action } from './action';

export abstract class LearningAgent<A extends Action<Environment>, Environment> {

    history: Array<{input: Environment, action: A, output: Environment}> = [];

    act(state: Environment): Environment {
        const rating = this.rateAction(this.history, state);
        console.log("Rating: ", rating);
        this.learn(this.history, rating);
        const curiosity = this.calculateCuriosity(state);
        const action = this.selectAction(state, curiosity);
        const output = action.execute(state);
        this.history.push({input: state, action: action, output: output});
        return output;
    }

    /** Performance element of the agent */
    abstract selectAction(state: Environment, curiosity: number): A;

    /** Critic of the agent - rates the previous action
     * based on the outcome/current state of the action history */
    abstract rateAction(history: Array<{input: Environment, action: A, output: Environment}>, currentState: Environment): number;

    abstract learn(history: Array<{input?: Environment, action: A, output: Environment}>, rating: number);

    /** Problem generator of the agent, should use data of the learning element to calculate */
    abstract calculateCuriosity(state: Environment): number;
}
