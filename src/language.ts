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
        'export-success': 'Eksport zakończony sukcesem',
        'export-failed': 'Eksport zakończony niepowodzeniem',
        'code-ready': 'Kod jest gotowy w konsoli',
    },
    'EN': {
        'no-selection': 'There\'s nothing selected',
        'more-than-one': 'There\'s more than one element selected',
        'no-frame': 'Selected element isn\'t frame',
        'export-success': 'Export finished successfully',
        'export-failed': 'Export finished with error',
        'code-ready': 'Code is ready in console',
    }
}

export default function translation(key: string) {
    return languages[language] && languages[language][key] || key;
}