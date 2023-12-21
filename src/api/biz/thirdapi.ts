import axios from 'axios'

export interface IWeather {
	dayweather: string
	winddirection: string
	windpower: string
	daytemp: string
	nighttemp: string
}

export const getWeather = async (): Promise<IWeather> => {
	const res = await axios.get(
		'https://restapi.amap.com/v3/weather/weatherInfo?city=420107&key=b33305c0867d1db017d8757430be496e&extensions=all',
	)
	console.log('wre----', res)
	if (res?.data?.status == '1') {
		const live = res?.data?.lives?.[0] || {}
		const forecast = res?.data?.forecasts?.[0]?.casts?.[0] || {}
		return Promise.resolve({ ...live, ...forecast })
	}
	return Promise.resolve({} as IWeather)
}

export const iconWeatherMap = {
	wind: [
		'有风',
		'平静',
		'微风',
		'和风',
		'清风',
		'强风/劲风',
		'疾风',
		'大风',
		'烈风',
		'风暴',
		'狂爆风',
		'飓风',
		'热带风暴',
		'龙卷风',
	],
	cloud: ['少云', '晴间多云', '多云'],
	snow: [
		'雪',
		'阵雪',
		'小雪',
		'中雪',
		'大雪',
		'暴雪',
		'小雪-中雪',
		'中雪-大雪',
		'大雪-暴雪',
		'冷',
		'雨雪天气',
		'雨夹雪',
		'阵雨夹雪',
	],
	fog: [
		'浮尘',
		'扬沙',
		'沙尘暴',
		'强沙尘暴',
		'雾',
		'浓雾',
		'强浓雾',
		'轻雾',
		'大雾',
		'特强浓雾',
	],
	sunny: ['晴', '热'],
	rain: [
		'阵雨',
		'雷阵雨',
		'雷阵雨并伴有冰雹',
		'小雨',
		'中雨',
		'大雨',
		'暴雨',
		'大暴雨',
		'特大暴雨',
		'强阵雨',
		'强雷阵雨',
		'极端降雨',
		'毛毛雨/细雨',
		'雨',
		'小雨-中雨',
		'中雨-大雨',
		'大雨-暴雨',
		'暴雨-大暴雨',
		'大暴雨-特大暴雨',
		'冻雨',
	],
	smog: ['阴', '霾', '中度霾', '重度霾', '严重霾', '未知'],
}

export function getWeatherIcon(weather: string) {
	// 这个是icon的默认值
	let url = 'images/weather/cloud.png'

	for (const weatherKey in iconWeatherMap) {
		if (Object.hasOwnProperty.call(iconWeatherMap, weatherKey)) {
			const weatherNames = iconWeatherMap[weatherKey]
			const findWeatherItem = weatherNames.find((name) => weather === name)

			// 如果找了某一类的图标了，那重新赋值url
			if (findWeatherItem) {
				// 这里的weatherKey和icon的名字一一对应了
				url = `/images/weather/${weatherKey}.svg`
				// console.debug('@find weather key = ', weatherKey)
				break
			}
		}
	}

	return url
}
