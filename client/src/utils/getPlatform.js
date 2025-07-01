export const getPlatform = () => {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua)) {
        return 'Mobile';
    }else{
        return 'Web'
    }
}