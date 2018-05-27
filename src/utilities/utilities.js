export function parseJson(data) {
    return data.map((number) => {
         return {
             datetime: new Date(number.datetime),
             price: number.price
         };
    });
};

export function fetchData(url, method) {
    return fetch(url, {
        mode: 'cors',
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.json().then(data => {
            if (response.ok) {
                return data;
            } else {
                console.log('');
            }
        });
    }).catch(function (error) {
        console.log('Something went wrong: ' + error);
    });
};

export function getFormattedTooltip(data) {
    let date = data.x.toDateString();
    return `x: ${date} \r\n y: ${data.y}`;
};