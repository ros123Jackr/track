import { colorGuide } from '@primitives/colors';
export enum Bureaus {
    crif = 'crif',
    experian = 'experian',
    equifax = 'equifax',
}

let scoreConfig = {
    excellent: {
        type: 'excellent',
        text: 'Excellent',
    },
    average: {
        type: 'average',
        text: 'Good',
    },
    poor: {
        type: 'poor',
        text: 'Poor',
    },
};

export let getTypeAndText = (score: number, bureau: string) => {
    if (bureau === Bureaus.experian && score < 850) {
        return score >= 750 ? scoreConfig.average : scoreConfig.poor;
    } else if (bureau === Bureaus.crif && score < 770) {
        return score >= 600 ? scoreConfig.average : scoreConfig.poor;
    } else if (score < 780) {
        return score >= 690 ? scoreConfig.average : scoreConfig.poor;
    }

    return scoreConfig.excellent;
};

let darkScoreMeter = (score: number, bureau: 'crif' | 'experian' | 'equifax') => ({
    colorMode: 'dark',
    reading: score,
    colorConfig: colorGuide.darkComponents.scoremeter,
    type: getTypeAndText(score, bureau).type,
    scoreDesc: getTypeAndText(score, bureau).text,
});

let lightScoreMeter = (
    score: number,
    bureau: 'crif' | 'experian' | 'equifax',
    oldScore: number,
) => ({
    colorMode: 'light',
    reading: score,
    oldReading: oldScore,
    colorConfig: colorGuide.lightComponents.scoremeter,
    type: getTypeAndText(score, bureau).type,
    showIndicators: true,
    scoreDesc: getTypeAndText(score, bureau).text,
});

export let getScoreMeterConfig = {
    lightScoreMeter,
    darkScoreMeter,
};
