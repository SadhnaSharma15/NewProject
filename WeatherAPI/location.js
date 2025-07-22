import https from 'https';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(chalk.green('Enter location name: '), (loc) => {
//  1. Resolve location name to coordinates using Open‑Meteo's Geocoding API
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc)}&count=1`;
  https.get(geocodeUrl, (res) => {
    let geoBody = '';
    res.on('data', chunk => geoBody += chunk);
    res.on('end', () => {
      const geo = JSON.parse(geoBody);
      if (!geo.results || geo.results.length === 0) {
        console.error(chalk.red(`❌ Could not resolve location "${loc}"`));
        rl.close();
        return;
      }

      const { latitude, longitude, name, country } = geo.results[0];
      console.log(chalk.magenta(`📍 Resolved to: ${name}, ${country} [${latitude}, ${longitude}]`));

      // 2. Fetch current weather
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,showers`;
      https.get(weatherUrl, (wRes) => {
        let wBody = '';
        wRes.on('data', chunk => wBody += chunk);
        wRes.on('end', () => {
          const w = JSON.parse(wBody);
       

          console.log(chalk.cyanBright(`🌡️ Temperature: ${w.current.temperature_2m} °C`));
          console.log(chalk.yellowBright(`💧 Humidity: ${w.current.relative_humidity_2m}%`));
          console.log(chalk.blueBright(`🌧️ Showers: ${w.current.showers} mm/h`));

          rl.close();
        });
      }).on('error', (e) => {
        console.error(chalk.red('Weather lookup error:', e.message));
        rl.close();
      });
    });
  }).on('error', (e) => {
    console.error(chalk.red('Geocoding error:', e.message));
    rl.close();
  });
});

// ${encodeURIComponent(city)} — your city name (properly URL-encoded, e.g. spaces → %20)

// limit=1 — to return only the top result