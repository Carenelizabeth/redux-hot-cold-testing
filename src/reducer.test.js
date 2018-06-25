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

        it('Should give feedback if guess is correct', () => {
            guess = state.correctAnswer;
            feedback = 'You got it!'
            state = reducer(state, makeGuess(guess));
            expect(state.feedback).toEqual(feedback)
        })

        it('Should give hot feedback if closer than 10', () => {
            guess = state.correctAnswer + 5;
            feedback = "You're Hot!";
            state = reducer(state, makeGuess(guess));
            expect(state.feedback).toEqual(feedback);
        })

        it('Should give warm feedback if closer than 30', () => {
            guess = state.correctAnswer + 25;
            feedback = "You're Warm.";
            state = reducer(state, makeGuess(guess));
            expect(state.feedback).toEqual(feedback);
        })

        it('Should give cold feedback if between 30 and 50', () => {
            guess = state.correctAnswer + 35;
            feedback = "You're Cold...";
            state = reducer(state, makeGuess(guess));
            expect(state.feedback).toEqual(feedback);
        })

        it('Should give ice cold feedback if more than 50', () => {
            guess = state.correctAnswer + 55;
            feedback = "You're Ice Cold...";
            state = reducer(state, makeGuess(guess));
            expect(state.feedback).toEqual(feedback);
        })

    })

    describe('generateAuralUpdate', () => {
        //let guesses = [10, 40, 70]
        //let feedback = "You're Warm"
        it('Should give feedback at the beginning of game', () => {
            let state;
            state = reducer(state, generateAuralUpdate());
            expect(state.auralStatus).toEqual(
                "Here's the status of the game right now: Make your guess! You've made 0 guesses."
            )
        });
    });
});