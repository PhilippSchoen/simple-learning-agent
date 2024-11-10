export abstract class LearningAgent<Action, Environment> {

    history: Array<{input: Environment, action: Action, output: Environment}> = [];

    act(state: Action): Environment {
        const rating = this.rateAction(this.history, state);
        this.learn(this.history, rating);
        const curiosity = this.calculateCuriosity();
        return this.selectAction(state, curiosity);
    }

    /** Performance element of the agent */
    abstract selectAction(state: Action, curiosity: number): Environment;

    /** Critic of the agent - rates the previous action
     * based on the outcome/current state of the action history */
    abstract rateAction(history: Array<{input: Environment, action: Action, output: Environment}>, currentState: Action): number;

    abstract learn(history: Array<{input?: Environment, action: Action, output: Environment}>, rating: number);

    /** Problem generator of the agent, should use data of the learning element to calculate */
    abstract calculateCuriosity(): number;
}
