import * as core from 'workbox-core';
import * as precaching from 'workbox-precaching';
import * as routing from 'workbox-routing';
import * as strategies from 'workbox-strategies';

core.setCacheNameDetails({
    prefix: "MI_Actress"
});
precaching.precacheAndRoute(self.__WB_MANIFEST);
routing.registerRoute(
    new RegExp('/img/'),
    new strategies.StaleWhileRevalidate({
        // Use a custom cache name
        cacheName: 'workbox:MI_img',
        plugins: [],
    })
);
self.skipWaiting();