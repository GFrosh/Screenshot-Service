const tryOut = async (url: string, link: string) => {
    const reqBody = { url: link }
    console.log("Screenshoting Page:", link);
    
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });
    const data = await res.text();
}

tryOut("http://localhost:3000/screenshot", "https://criticaldeveloper.com/");
