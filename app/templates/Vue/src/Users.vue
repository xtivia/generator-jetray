<template>
     <div class="container">
        <table class="table table-bordered table-striped">
           <thead class="thead-dark">
               <tr><th scope="col">Email</th><th scope="col">Name</th></tr>
            </thead>
           <tbody>
               <tr v-for="user in users" :key=user.email>
                  <td>{{ user['email'] }}</td>
                  <td>{{ user['name'] }}</td>
              </tr>
           </tbody>
       </table>
    </div>
</template>

<script>
    import sortBy from 'lodash/sortBy'
    import request from 'superagent'

    export default {
         data() {
            return {
                users: []
            }
        },
        mounted() {
            let self = this;
            request
                .get("http://jsonplaceholder.typicode.com/users")
                .end(function (err, res) {
                    if (err || !res.ok) {
                        throw new Error("Bad response from server");
                    }
                    let sorted_users = sortBy(res.body, function(o) { return o.email; });
                    self.users = sorted_users;
                });            
        }
    }
</script>

<style></style>



