export function getAssetsUrl(url) {
	return new URL(`../static/${url}`, import.meta.url).href
}
