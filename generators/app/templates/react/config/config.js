
Loader.addModule({
    dependencies: [],
    name: 'react',
    path: MODULE_PATH + '/lib/react/dist/react.js'
});

Loader.addModule({
    dependencies: ['react'],
    name: 'react-dom',
    path: MODULE_PATH + '/lib/react-dom/dist/react-dom.js'
});

Loader.addModule({
    dependencies: ['react','react-dom'],
    name: '@@portletNameCleaned',
    path: MODULE_PATH + '/App.js'
});


