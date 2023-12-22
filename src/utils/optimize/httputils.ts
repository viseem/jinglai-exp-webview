const service = { _requestCount: 0, _requestTimeIdList: [] }
function clearTimeoutByUrl(
	url: string,
	requestList = service._requestTimeIdList,
) {
	for (let item in requestList) {
		if (url === requestList[item]['url']) {
			clearTimeout(requestList[item]['timeId'])
		}
	}
}

export function pushUrlLoading(url: string) {
	service._requestCount++
	// 如果接口请求小于200ms的话 那么就不显示loading
	const timeId = setTimeout(() => {
		toast.loading()
	}, 500)
	service._requestTimeIdList.push({
		timeId: timeId,
		url,
	})
}

export function clearUrlLoading(url: string) {
	service._requestCount--
	clearTimeoutByUrl(url, service._requestTimeIdList)
	if (service._requestCount < 0) {
		service._requestCount = 0
	}
	if (service._requestCount === 0) {
		// 当全部的接口请求完毕后 关闭loading
		toast.close()
	}
}
