setInterval(() => {
    const date = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const currentDate = date.toLocaleDateString("en-IN", options);

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;

    const time = `${hour}:${minute}:${second}`;
    
    document.querySelector("#date").innerHTML = currentDate;
    document.querySelector("#time").innerHTML = time;
}, 1000);