<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <ul>
        <li v-for="item in dataList" :key="item.filmId">
          <div class="pic_show"><img :src="item.poster"></div>
          <div class="info_list">
            <h2>{{ item.name }} <img src="@/assets/maxs.png" v-if="item.item.type === 2" /></h2>
            <p>主演: {{ item.actors | actorToString }}</p>
            <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
            <p>{{ item.premiereAt*1000 | dateFormat }}上映</p>
          </div>
          <div class="btn_pre">
            预售
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  data () {
    return {
      dataList: [],
      isLoading: true,
      prepareId: 0
    }
  },
  activated () {
    if(this.prepareId == this.$store.state.city.id){
      return false
    }
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.city.id}&pageNum=1&pageSize=10&type=2&k=7641093`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"159670442842296837931009","bc":"440300"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      if(res.data.status === 0){
        this.dataList = res.data.data.films
        this.prepareId == this.$store.state.city.id
        this.isLoading = false
      }
    })
  }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>