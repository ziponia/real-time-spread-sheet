<template>
  <div>
    <input type="text" style="display: block;" />
    <hot-table :data="data" :settings="hotSettings" ref="hotTableComponent"></hot-table>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import axios from "axios";
import "handsontable/dist/handsontable.full.css";

const PUSHER_APP_ID = "{{ PUSHER APP ID }}";
const PUSHER_CLUSTER_NAME = "{{ PUSHER CLUSTER NAME }}";

export default {
  created() {
    this.initiPusher();
    this.listenSheet();
  },
  data: function() {
    return {
      data: [
        ["이름", "나이"], // :0
        ["커비", 33], // :1
        ["링커비", 33]
      ],
      hotSettings: {
        colWidths: 100,
        width: "100%",
        height: 320,
        rowHeights: 23,
        rowHeaders: true,
        colHeaders: true,
        minRows: 100,
        minCols: 100,
        afterChange: (changes, source) => {
          if (source === "loadData") return;
          this.updateSheetAsync(changes);
        }
      },
      pusherClient: null,
      channel: null,
      socketId: null
    };
  },

  methods: {
    /**
     * Pusher 라이브러리를 초기화 합니다.
     */
    initiPusher: function() {
      const _this = this;

      _this.pusherClient = new Pusher(PUSHER_APP_ID, {
        cluster: PUSHER_CLUSTER_NAME
      });

      /**
       * pusher 로 Pusher 서버와 연결되면, socketID 를 설정합니다.
       * socketID 는 서버에서 broadcast 용도로 사용합니다.
       */
      _this.pusherClient.connection.bind("connected", function() {
        console.log("Pushser Connected: ");

        _this.socketId = _this.pusherClient.connection.socket_id;
      });

      /**
       * sheet-1 채널을 구독합니다.
       */
      _this.channel = _this.pusherClient.subscribe("sheet-1");
    },

    /**
     * 시트를 구독 (subscribe) 합니다.
     */
    listenSheet: function() {
      const _this = this;

      /**
       * save-sheet 이벤트가 발생하면, 처리합니다.
       */
      this.channel.bind("save-sheet", (data, metadata) => {
        _this.updateSheet(data.data);
      });
    },

    /**
     * 시트를 업데이트 합니다.
     */
    updateSheet: function(data) {
      const instance = this.$refs.hotTableComponent.hotInstance;
      const _this = this;

      let currentData = instance.getData();

      for (let i = 0; i < data.length; i++) {
        currentData[data[i][0]][data[i][1]] = data[i][3];
      }

      instance.loadData(currentData);
    },

    /**
     * 변경 된 시트를 서버로 전송합니다.
     */
    updateSheetAsync: async function(changeData) {
      const _this = this;
      const { data } = await axios.post("http://localhost:5000/message", {
        data: changeData,
        socket_id: _this.socketId
      });
    }
  },
  components: {
    HotTable
  }
};
</script>
