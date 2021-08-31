<template>
  <div>
    <h1 style="color: #909399">DUYỆT BÀI ĐĂNG</h1>
    <el-table
      :data="searchResult ? searchResult : tableData"
      style="width: 100%"
    >
      <el-table-column label="STT" type="index" width="60">
              </el-table-column>
      <!-- <el-table-column label="Id" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Image" prop="imageUrl">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleImage(scope.$index, scope.row)"
            >Hiển thị</el-button
          >
          <el-dialog
            title="Hình ảnh"
            :visible.sync="imageDialogVisible"
          >
            <img v-if='imageDiary !== ""' style="width: 400px; height: 400px" :src="imageDiary" />
            <carousel v-if="listImage.length === 5">
              <slide>
                <img  style="width: 100%; height: 100%" :src="listImage[0]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[1]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[2]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[3]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[4]">
              </slide>
            </carousel>
            <carousel v-if="listImage.length === 4">
              <slide>
                <img  style="width: 100%; height: 100%" :src="listImage[0]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[1]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[2]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[3]">
              </slide>
            </carousel>
            <carousel v-if="listImage.length === 3">
              <slide>
                <img  style="width: 100%; height: 100%" :src="listImage[0]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[1]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[2]">
              </slide>
            </carousel>
            <carousel v-if="listImage.length === 2">
              <slide>
                <img style="width: 100%; height: 100%" :src="listImage[0]">
              </slide>
              <slide style="margin-left: 3px">
                <img style="width: 100%; height: 100%" :src="listImage[1]">
              </slide>
            </carousel>
          </el-dialog>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Người tạo" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.createdBy }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Hình ảnh" prop="image" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.imageURL = null">Không có hình ảnh</span>
          <img
            v-if="scope.row.imageURL != ''"
            :src="scope.row.imageURL"
            style="height: 150px; width: 300px"
          />
        </template>
      </el-table-column> -->
      <el-table-column label="Nội dung" :min-width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.diaryContent }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            v-on:change="onSearchInput(search)"
            size="mini"
            placeholder="Type to search"
          />
        </template>
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="primary"
            @click="viewDetail(scope.$index, scope.row)"
            style="margin-left: 10px"
            >Xem chi tiết</el-button> -->
          <el-button
            size="mini"
            @click="handleApprove(scope.$index, scope.row)"
            :disabled="disabledFlag"
            >Duyệt</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeny(scope.$index, scope.row)"
            :disabled="disabledFlag"
            style="margin-left: 10px"
            >Không duyệt</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row
      style="margin-top: 10px"
      v-if="searchResult == null || this.rsPage === 1"
    >
      <el-col :span="6" :offset="11">
        <el-button
          v-for="item in pagination"
          :key="item.pageId"
          :label="item.pageId"
          :value="item.pageId"
          circle
          @click="paginationLoad(item.pageId)"
          type="success"
          >{{ item.pageId }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase/app";
import "firebase/firebase-storage";
import Request from "../services/RequestBase.js";
import baseConfig from "../config";
const backendIp = baseConfig.backendIp;
import { Carousel, Slide } from "vue-carousel";

export default {
  data() {
    return {
      tableData: [],
      imageDialogVisible: false,
      dialogImage: { imageURL: "" },
      uploadingImage: "",
      formLabelWidth: "120px",
      formLabelWidth1: "180px",
      search: "",
      editedIndex: -1,
      NewsIdDelete: "",
      listtype: [],
      pagination: [],
      totalPages: 0,
      searchResult: null,
      rsPage: 0,
      disabledFlag: false,
      imageList: "",
      imageDiary: "",
      listImage: []
    };
  },
  components: {
    Carousel,
    Slide,
  },
  created: function () {
    axios
      .get(`https://service.mumbi.xyz/api/Diaries/GetDiaryToApprove`)
      .then((rs) => {
        this.tableData = rs.data.data;
      })
      .catch((e) => {
        console.error(e);
        console.log(e);
      });
  },
  methods: {
    handleImage(index, row) {
      this.imageDialogVisible = true;
      this.editedIndex = this.tableData.indexOf(row);
      let imageList = this.tableData[this.editedIndex].imageURL;
      if (imageList.indexOf(";") == -1) {
        this.imageDiary = imageList;
      } else if(imageList.indexOf(";") != -1){
        this.imageDiary = ""
        this.listImage = imageList.split(';');
      }
      // if(imageList.)
      // if(row.imageURL.con)
      // this.dialogImage.imageURL = imageURL;
    },
    async handleApprove(index, row) {
      this.editedIndex = this.tableData.indexOf(row);
      let diaryId = this.tableData[this.editedIndex].id;
      let childIdApprove = this.tableData[this.editedIndex].childId;
      let content = this.tableData[this.editedIndex].diaryContent;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios
        .put(
          `https://service.mumbi.xyz/api/Diaries/UpdateDiaryPublic/${diaryId}?childID=${childIdApprove}`,
          {
            id: diaryId,
            approvedFlag: true,
            publicFlag: true,
            diaryContent: content,
            childId: childIdApprove,
            // lastModifiedBy: userInfo.id,
            publicDate: new Date(),
          }
        )
        .then((rs) => {
          this.$message({
            type: "success",
            message: `Duyệt bài đăng id{${diaryId}} thành công !`,
          });
        });
      await axios
        .get(`https://service.mumbi.xyz/api/Diaries/GetDiaryToApprove`)
        .then((rs) => {
          this.tableData = rs.data.data;
        })
        .catch((e) => {
          console.error(e);
          console.log(e);
        });
    },
    readAsync(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = () => {
          reject(new Error("Unable to read.."));
        };
        reader.readAsDataURL(blob);
      });
    },
    async handleFileChange() {
      let file = this.$refs.Newsimageupload.files[0];
      let resultData = await this.readAsync(file);
      this.form.imageUrl = resultData;
      this.form.imageFile = file;
    },
    async handleFileChangeOnCreateNews() {
      let file = this.$refs.createNewsimageupload.files[0];
      let resultData = await this.readAsync(file);
      this.addNews.imageUrl = resultData;
      this.addNews.imageFile = file;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.addNews.image = "";
    },
    async handleDeny(index, row) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.editedIndex = this.tableData.indexOf(row);
      let diaryId = this.tableData[this.editedIndex].id;
      let childIdApprove = this.tableData[this.editedIndex].childId;
      let content = this.tableData[this.editedIndex].diaryContent;
      await axios
        .put(
          `https://service.mumbi.xyz/api/Diaries/UpdateDiaryPublic/${diaryId}?childID=${childIdApprove}`,
          {
            id: diaryId,
            approvedFlag: false,
            publicFlag: false,
            childId: childIdApprove,
            publicDate: new Date(),
            // lastModifiedBy: userInfo.id
          }
        )
        .then((rs) => {
          this.$message({
            type: "success",
            message: `Không duyệt bài đăng id{${diaryId}} thành công !`,
          });
        });
      await axios
        .get(`https://service.mumbi.xyz/api/Diaries/GetDiaryToApprove`)
        .then((rs) => {
          this.tableData = rs.data.data;
        })
        .catch((e) => {
          console.error(e);
          console.log(e);
        });
    },
    viewDetail(index, row) {
      localStorage.setItem("ChildId", row.childId);
      this.$router.push({
        name: "NHẬT KÝ CHI TIẾT",
      });
    },
    async onSearchInput(e) {
      if (this.search === "") {
        this.rsPage = 1;
      } else {
        this.rsPage = 0;
      }
      try {
        let result = await axios.get(`${backendIp}/api/Newss?query=${e}`);
        console.log(result);
        this.searchResult = result.data.data;
      } catch (error) {
        this.searchResult = null;
        console.log(error);
      }
    },
  },
};
</script>
