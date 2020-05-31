<template>
  <div class="container">
    <div class="support-tickets">
      <div class="flex-card is-ticket-list light-bordered">
        <!-- Contacts table -->
        <table class="table tickets-table">
          <!-- Table header -->
          <thead>
            <tr>
              <th class="gap">
                <!-- Filter dropdown -->
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span>Tasked By</span>
                  </div>
                </div>
              </th>
              <th class="gap">
                <!-- Filter dropdown -->
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span>Task Title</span>
                  </div>
                </div>
              </th>
              <th class="gap">
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span>Task Location</span>
                  </div>
                </div>
              </th>
              <th class="gap">
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span>Task Amount</span>
                  </div>
                </div>
              </th>
              <th class="gap">
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span>Total Bids</span>
                  </div>
                </div>
              </th>
              <th class="gap">
                <div class="dropdown filter-dropdown dropdown-trigger">
                  <div class="button">
                    <span style="margin-left:60px;">Actions</span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td class="ticket-id">{{task.user}}</td>
              <td class="ticket-name">
                <span>{{task.title}}</span>
              </td>
              <td class="assignee">{{task.location}}</td>
              <td class="assignee">{{task.amount}}</td>
              <td class="status is-new">
                <span class="inner">
                  <span class="tag">13</span>
                </span>
              </td>
              <!-- <td class="modifications">
                            <span><span class="date">--</span> <span class="time"></span></span>
                            <span><small></small></span>
              </td>-->
              <td class="abc">
                <div class="field is-grouped">
                  <router-link :to="task.path">
                    <div class="button" style="margin:0 3px">view</div>
                  </router-link>
                  <div class="button">Bid now</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="support-pagination">
        <a class="pagination-item">
          <i class="material-icons">more_horiz</i>
        </a>
        <a class="pagination-item">
          <i class="material-icons">keyboard_arrow_left</i>
        </a>
        <a class="pagination-item is-active">
          <span>1</span>
        </a>
        <a class="pagination-item">
          <span>2</span>
        </a>
        <a class="pagination-item">
          <span>3</span>
        </a>
        <a class="pagination-item">
          <i class="material-icons">keyboard_arrow_right</i>
        </a>
        <a class="pagination-item">
          <i class="material-icons">more_horiz</i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasks: {}
    };
  },
  created() {
    axios
      .get("/api/task")
      .then(res => (this.tasks = res.data.data))
      .catch(error => console.log(error.response.data));
  }
};
</script>
<style>
.table th.gap {
  width: 20%;
}

.support-tickets .is-ticket-list .table td.status span {
  display: inherit;
}

.button.button-cta {
  padding: 22px 40px !important;
}

.button.button-cta.btn-outlined.is-bold {
  border-width: 2px;
  font-weight: 600;
}
</style>
