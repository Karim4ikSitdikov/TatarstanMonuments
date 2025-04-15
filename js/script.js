document.addEventListener('DOMContentLoaded', function() {
    ymaps.ready(initMap);
    
    // Обработка формы добавления памятника
    const form = document.getElementById('monument-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Ваша заявка принята. После проверки модератором памятник будет добавлен на карту.');
            form.reset();
        });
    }
});

function initMap() {
    // Создаем карту с центром в Татарстане
    const map = new ymaps.Map('map', {
        center: [55.3, 51.5], // Центр Татарстана
        zoom: 8,
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
    });

    // Стиль для меток
    const monumentStyle = {
        preset: 'islands#redIcon',
        iconColor: '#e30613'
    };

    // Добавляем памятники (можно заменить на загрузку из JSON)
    const monuments = [
        {
            name: "Мемориал «Вечный огонь»",
            description: "Мемориальный комплекс в Альметьевске посвящён павшим в годы Великой Отечественной войны.",
            address: "г.Альметьевск, улица Тимирязева, 50",
            coords: [54.898785, 52.299951],
            photo: "https://sun9-28.userapi.com/impg/__PcvMTwTZ5H1sg4F_-VOc63yjOs_dQxm_LC4Q/lzo-t__da6k.jpg"
        },
        {
            name: "Памятник солдату-освободителю",
            description: "На постаменте Солдат-освободитель с табличками погибших.",
            address: "Муслюмовский район, с. Ташлияр",
            coords: [55.260477, 52.941246]
        },
        {
            name: "Мемориальный комплекс «Родина-мать»",
            description: "Состоит из вечного огня, скульптуры и стены с именами погибших.",
            address: "г.Набережные Челны",
            coords: [55.6894, 52.305]
        }
    ];

    // Создаем коллекцию меток
    const monumentCollection = new ymaps.GeoObjectCollection(null, {
        preset: 'islands#redIcon'
    });

    // Добавляем метки на карту
    monuments.forEach(monument => {
        const placemark = new ymaps.Placemark(
            monument.coords,
            {
                balloonContentHeader: monument.name,
                balloonContentBody: `
                    <div class="balloon">
                        <h3>${monument.name}</h3>
                        ${monument.photo ? `<img src="${monument.photo}" alt="${monument.name}" style="max-width:250px;">` : ''}
                        <p><strong>Адрес:</strong> ${monument.address}</p>
                        <p>${monument.description}</p>
                    </div>
                `,
                hintContent: monument.name
            },
            monumentStyle
        );
        monumentCollection.add(placemark);
    });

    map.geoObjects.add(monumentCollection);

    // Устанавливаем границы для показа всех памятников
    if (monuments.length > 0) {
        map.setBounds(monumentCollection.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 50
        });
    }
}