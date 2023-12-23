export function getFileExtension(filename: string): string {
	return filename?.includes('.')
		? filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase()
		: filename
}

export function isWordFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	return extension === 'doc' || extension === 'docx'
}

export function isPDFFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	return extension === 'pdf'
}

export function isExcelFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	return extension === 'xls' || extension === 'xlsx'
}

export function isPPTFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	console.log('extension----', extension)
	return extension === 'pptx' || extension === 'ppt'
}

export function isImgFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	return (
		extension === 'jpg' ||
		extension === 'jpeg' ||
		extension === 'png' ||
		extension === 'gif' ||
		extension === 'bmp'
	)
}
// 'pdf',
const knownExtensions = [
	'doc',
	'docx',
	'jpg',
	'jpeg',
	'png',
	'gif',
	'bmp',
	'xls',
	'xlsx',
	'pdf',
	'pptx',
	'ppt',
]

export function isNotKnowFile(filename: string): boolean {
	const extension = getFileExtension(filename)
	return !knownExtensions.includes(extension)
}
