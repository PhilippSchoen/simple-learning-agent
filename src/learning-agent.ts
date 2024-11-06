export abstract class LearningAgent<Input, Output> {

    history: Array<Input> = [];

    act(state: Input): Output {
        const rating = this.rateAction(this.history, state);
        this.learn(this.history, rating);
        const curiosity = this.calculateCuriosity();
        return this.selectAction(state, curiosity);
    }

    /** Performance element of the agent */
    abstract selectAction(state: Input, curiosity: number): Output;

    /** Critic of the agent - rates the previous action
     * based on the outcome/current state of the action history */
    abstract rateAction(history: Array<Input>, currentState: Input): number;

    abstract learn(history: Array<Input>, rating: number);

    /** Problem generator of the agent, should use data of the learning element to calculate */
    abstract calculateCuriosity(): number;
}
