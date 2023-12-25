export const removeHTMLTags = (text: string | undefined) => {
	const regex = /<[^>]+>/g
	return text ? text?.replace(regex, '') : ''
}
