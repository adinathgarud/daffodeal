import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const response = await axios.post(`${server}/event/create-event`, eventData);

    dispatch({
      type: "eventCreateSuccess",
      payload: response.data.event, // ✅ Correctly accessing the response data
    });
  } catch (error) {
    console.error("Error creating event:", error);

    dispatch({
      type: "eventCreateFail",
      payload: error.response?.data?.message || "Event creation failed",
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsShopRequest" });

    const response = await axios.get(`${server}/event/get-all-events/${id}`);

    dispatch({
      type: "getAlleventsShopSuccess",
      payload: response.data.events, // ✅ Correctly accessing response data
    });
  } catch (error) {
    console.error("Error fetching shop events:", error);

    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response?.data?.message || "Failed to fetch events",
    });
  }
};


// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteeventRequest" });

    const response = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: response.data.message, // ✅ Correctly accessing response data
    });
  } catch (error) {
    console.error("Error deleting event:", error);

    dispatch({
      type: "deleteeventFailed",
      payload: error.response?.data?.message || "Failed to delete event",
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAlleventsRequest" });

    const response = await axios.get(`${server}/event/get-all-events`);

    dispatch({
      type: "getAlleventsSuccess",
      payload: response.data.events, // ✅ Using response.data to avoid 'data' undefined error
    });
  } catch (error) {
    console.error("Error fetching all events:", error);

    dispatch({
      type: "getAlleventsFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};