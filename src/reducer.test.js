import reducer from './reducer';
import {generateAuralUpdate, restartGame, makeGuess} from './actions';

describe('reducer', () => {


    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '_UNKNOWN'});
        expect(state.guesses).toEqual([]);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.auralStatus).toEqual('');
        console.log(state.correctAnswer);
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '_UNKNOWN'});
        expect(state).toBe(currentState);
    })

    describe('restartGame', () => {
        it('Should set the game back to the initial state', () => {
            let state;
            state = reducer(state, restartGame());
            expect(state.guesses).toEqual([]);
            expect(state.feedback).toEqual('Make your guess!');
            expect(state.auralStatus).toEqual('');
        })
    })

    describe('makeGuess', () => {
        let feedback, guess;
        let state;

        it('Should add guesses to the state as an array', () => {
            state = reducer(state, makeGuess(50));
            state = reducer(state, makeGuess(25));
            state = reducer(state, makeGuess(75));
            expect(state.guesses).toEqual([50, 25, 75])
        })

    })
})