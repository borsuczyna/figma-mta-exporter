interface Definitions {
    [key: string]: string
};

let language: string = 'EN';

const languages: {
    [key: string]: Definitions
} = {
    'PL': {
        'no-selection': 'Nie wybrano żadnego elementu',
        'more-than-one': 'Zaznaczono więcej niż jeden element',
        'no-frame': 'Zaznaczony element to nie frame',
    },
    'EN': {
        'no-selection': 'There\'s nothing selected',
        'more-than-one': 'There\'s more than one element selected',
        'no-frame': 'Selected element isn\'t frame'
    }
}

export default function translation(key: string) {
    return languages[language] && languages[language][key] || key;
}