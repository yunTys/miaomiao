<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <ul v-else>
      <li v-for="item in dataList" :key="item.cinemaId">
        <div class="name-price">
          <span>{{ item.name }}</span>
          <span class="q"><span class="price">{{ item.lowPrice / 100 }}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{ item.address }}</span>
          <span>距离未知</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CityList',
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
      url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.city.id}&ticketFlag=1&k=6775958`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"159670442842296837931009","bc":"440300"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res) => {
      if(res.data.status === 0){
        this.dataList = res.data.data.cinemas
        this.prepareId == this.$store.state.city.id
        this.isLoading = false
      }
    })
  }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(1){ display: inline-block; width: calc(100% - 70px) }
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .name-price { display: flex; justify-content: space-between; }
</style>