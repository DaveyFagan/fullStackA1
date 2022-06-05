import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placetimeService = {
  placetimeUrl: serviceUrl,

  
  async createImage(monument) {
    const res = await axios.post(`${this.placetimeUrl}/api/monuments/${monument.id}/uploadimage`,monument);
    return res.data;
  },

  async createUser(user) {
    const res = await axios.post(`${this.placetimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placetimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placetimeUrl}/api/users`);
    return res.data;
  },

  async createPlace(place) {
    const res = await axios.post(`${this.placetimeUrl}/api/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const response = await axios.delete(`${this.placetimeUrl}/api/places`);
    return response.data;
  },

  async deletePlace(id) {
    const response = await axios.delete(`${this.placetimeUrl}/api/places/${id}`);
    return response;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.placetimeUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/places/${id}`);
    return res.data;
  },

  async getAllMonuments() {
    const res = await axios.get(`${this.placetimeUrl}/api/monuments`);
    return res.data;
  },

  async createMonument(id, monument) {
    const res = await axios.post(`${this.placetimeUrl}/api/places/${id}/monuments`, monument);
    return res.data;
  },

  async deleteAllMonuments() {
    const res = await axios.delete(`${this.placetimeUrl}/api/monuments`);
    return res.data;
  },

  async getMonument(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/monuments/${id}`);
    return res.data;
  },

  async deleteMonument(id) {
    const res = await axios.delete(`${this.placetimeUrl}/api/monuments/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placetimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

};