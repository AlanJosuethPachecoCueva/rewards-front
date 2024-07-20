const CACHE_NAME = 'image-cache-v1';
const urlsToCache = [
    // Lista de URLs de imágenes que deseas cachear inicialmente, si es necesario.
    "https://storage.googleapis.com/rewards2-fdd10.appspot.com/kitImages/1762024-44-9.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-4vdwe%40rewards2-fdd10.iam.gserviceaccount.com%2F20240719%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240719T201822Z&X-Goog-Expires=14400&X-Goog-SignedHeaders=host&X-Goog-Signature=6b3537a26d752356a1ff34f0c734936498405bc51051e5e46d388e4e6ffbe68c43fc1a751b703999eb88d21b8c8589417dd9c9fb1931760057e924799a2cbcb0cd12eafa683dd68b0ac3da6dfa796ae00d8d1bcc62402e45e84a6bd0209c088fed792061c70cdc2b476c5f01af1c9e4dac44f8866e6c08099c659bd24bb0baa3c6896d23b0004f29333122f3ce308b75ee306989927dc569bd57dff1ceb7a560c59a34862b4852366a25bac329c0f70fc426c784481ddc3b95d15776efa9b65514cafee47384b7dd27d3d47cce134f147469f404230a47e47c14bcd5edc8859e455ead7da7072f95151eab48e7a365c81716aff8125c07ac55e4d72dc829d8b0",
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(response => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});
