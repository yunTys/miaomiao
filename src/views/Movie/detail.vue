<template>
  <div id="content-detail" class="translateIn">
    <Header title="影片详情" >
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="film.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{ film.name }}</h2>
						<p class="grade">9.2 分</p>
						<p>{{ film.category }}</p>
						<p>{{ film.nation }} / {{ film.runtime }}分钟</p>
						<p>{{ film.premiereAt * 1000 | dateFormat }} 上映 </p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{ film.synopsis }}</p>
			</div>
			<div class="line"></div>
			<div class="actors">
				<div class="title">演职人员</div>
				<div class="actors-swiper swiper-container" ref="actors_swiper">
					<ul class="swiper-wrapper">
						<li class="swiper-slide" v-for="(item,index) in film.actors" :key="index">
							<div class="actor-img"><img :src="item.avatarAddress" alt=""></div>
							<span class="actor-name">{{ item.name }}</span>
							<span class="actor-role">{{ item.role }}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="line"></div>
			<div class="photos">
				<div class="title">剧照</div>
				<div class="photos-swiper swiper-container" ref="photos_swiper">
					<ul class="swiper-wrapper">
						<li class="swiper-slide" v-for="(item, index) in film.photos" :key="index">
							<img :src="item" alt="">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header'
export default {
	name: 'Detail',
	props: ['id'],
  components: {
    Header
	},
	data () {
		return {
			film: {}
		}
	},
	methods: {
		handleToBack () {
			this.$router.back()
		}
	},
	mounted () {
		// console.log(this.id)
		this.axios({
			url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=343335`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"159670442842296837931009"}',
				'X-Host': 'mall.film-ticket.film.info'
			}
		}).then((res) => {
			this.film = res.data.data.film
			// console.log(this.film)
			this.$nextTick(() => {
				var actorsSwiper = new Swiper(this.$refs.actors_swiper, {
					freeMode: true,
					slidesPerView: 'auto'
				})

				var photosSwiper = new Swiper(this.$refs.photos_swiper, {
					freeMode: true,
					slidesPerView: 'auto'
				})
			})
		})
	}
}
</script>

<style scoped>
#content-detail{ position: absolute; top: 0; left: 0; z-index: 100; width: 100%; min-height: 100%; background: #fff }
#content-detail.translateIn{ animation: .3s transX }
@keyframes transX{
	0%{ transform: translateX(100%) }
	100%{ transform: translateX(0) }
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ width:100%; overflow: hidden;}
.detail_list .detail_list_img{ position: relative; width:100%; height: 56vw; overflow: hidden;}
.detail_list .detail_list_img img{ position: absolute; top: 50%; transform: translateY(-50%); width:100%;}
.detail_list .detail_list_info{ margin-top: 8px;padding: 0 15px}
.detail_list .detail_list_info h2{ font-size: 20px; color:#191a1b; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ margin-top: 4px;color:white; line-height: 20px; font-size: 14px; color:#797d82;}
.detail_list .detail_list_info .grade{color: #ffb232}

#content .detail_intro{ padding: 15px;}

.actors-swiper{ margin-bottom: 10px; }
.actors-swiper .swiper-wrapper{ padding-left: 15px }
.actors-swiper .swiper-slide{ margin-right: 10px;width: 85px; min-width: 85px; }
.actors-swiper .swiper-slide .actor-img{ position: relative;width: 85px;height: 85px;overflow: hidden;}
.actors-swiper .swiper-slide .actor-img img{ position: absolute; top: 50%;width: 100%; transform: translateY(-50%) }
.actors-swiper .swiper-slide span{ display: block; text-align: center; }
.actors-swiper .swiper-slide .actor-name{ padding-top: 10px; font-size: 14px; color: #191a1b }
.actors-swiper .swiper-slide .actor-role{ margin-top: 4px;font-size: 13px; color: #797d82 }

.photos{ margin-bottom: 15px }
.photos-swiper .swiper-slide{ position: relative; margin-right: 10px; width: 150px; min-width: 150px; height: 100px; overflow: hidden; }
.photos-swiper .swiper-slide img{ position: absolute; top: 50%;width: 100%; transform: translateY(-50%) }
.photos-swiper .swiper-wrapper{ padding-left: 15px }

#content .title{ padding: 15px; font-size: 16px; color: #191a1b }
.line{ height: 10px; background: #f4f4f4; }
</style>