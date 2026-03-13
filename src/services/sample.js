const tryOut = async (url, link) => {
    const reqBody = { url: link }
    console.log(reqBody);
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });
    const data = await res.text();
    console.log(data);
}

tryOut("http://localhost:3000/screenshot", "https://example.com");
