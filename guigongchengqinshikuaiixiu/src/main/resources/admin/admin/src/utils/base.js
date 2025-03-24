const base = {
    get() {
        return {
            url : "http://localhost:8080/guigongchengqinshikuaiixiu/",
            name: "guigongchengqinshikuaiixiu",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/guigongchengqinshikuaiixiu/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "贵工程寝室快修小程序"
        } 
    }
}
export default base
