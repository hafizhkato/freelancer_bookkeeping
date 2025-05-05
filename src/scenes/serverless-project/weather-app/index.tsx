import React, { useState } from 'react';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace this with your key

const Weather: React.FC = () => {
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [weatherData, setWeatherData] = useState<{
        average: {
            temperature: string;
            humidity: string;
            description: string;
        };
        hourly: {
            time: string;
            temperature: string;
            humidity: string;
            description: string;
        }[];
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city || !date) {
            setError('Please enter a city and select a date.');
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );

            const data = await response.json();

            if (data.cod !== '200') {
                setError(data.message || 'Failed to fetch forecast.');
                setWeatherData(null);
                return;
            }

            const selectedForecasts = data.list.filter((item: any) =>
                item.dt_txt.startsWith(date)
            );

            if (selectedForecasts.length === 0) {
                setError('No forecast available for the selected date.');
                setWeatherData(null);
                return;
            }

            const avgTemp =
                selectedForecasts.reduce((sum: number, item: any) => sum + item.main.temp, 0) /
                selectedForecasts.length;

            const avgHumidity =
                selectedForecasts.reduce((sum: number, item: any) => sum + item.main.humidity, 0) /
                selectedForecasts.length;

            const descriptions = selectedForecasts.map((item: any) => item.weather[0].description);
            const commonDescription = descriptions
                .sort((a: any, b: any) =>
                    descriptions.filter((v: any) => v === a).length - descriptions.filter((v: any) => v === b).length
                )
                .pop();

            const hourlyData = selectedForecasts.map((item: any) => ({
                time: item.dt_txt.split(' ')[1].slice(0, 5), // HH:MM
                temperature: `${item.main.temp.toFixed(1)}°C`,
                humidity: `${item.main.humidity}%`,
                description: item.weather[0].description,
            }));

            setWeatherData({
                average: {
                    temperature: `${avgTemp.toFixed(1)}°C`,
                    humidity: `${avgHumidity.toFixed(0)}%`,
                    description: commonDescription,
                },
                hourly: hourlyData,
            });

            setError(null);
        } catch (err) {
            setError('An error occurred while fetching forecast.');
            setWeatherData(null);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Weather Forecast</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date (next 5 days)</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    Get Forecast
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {weatherData && (
                <div className="mt-6 border-t pt-4 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Average on {date}</h2>
                        <p><strong>Temperature:</strong> {weatherData.average.temperature}</p>
                        <p><strong>Humidity:</strong> {weatherData.average.humidity}</p>
                        <p><strong>Condition:</strong> {weatherData.average.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {weatherData.hourly.map((hour, index) => (
                                <div key={index} className="border rounded p-3 shadow-sm">
                                    <p><strong>Time:</strong> {hour.time}</p>
                                    <p><strong>Temp:</strong> {hour.temperature}</p>
                                    <p><strong>Humidity:</strong> {hour.humidity}</p>
                                    <p><strong>Condition:</strong> {hour.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
