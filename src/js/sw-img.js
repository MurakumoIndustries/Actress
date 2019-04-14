import * as routing from 'workbox-routing';
import * as strategies from 'workbox-strategies';
routing.registerRoute(
    new RegExp('/img/'),
    new strategies.StaleWhileRevalidate({
        // Use a custom cache name
        cacheName: 'workbox:MI_img',
        plugins: [],
    })
);