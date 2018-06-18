<template>
    <div class=container>
        <nav class="navbar navbar-default">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a href="#" @click.prevent="go('/')">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" @click.prevent="go('/users')">Users</a>
                </li>
            </ul>
        </nav>
        <component :is="currentView"></component>
    </div>

</template>

<script>
    import App from './App.vue'
    import Users from './Users.vue'
    import Navigo from 'navigo'

    let root = null;
    let useHash = true;   // Defaults to: false
    let hash = '#';       // Defaults to: '#'
    let router = new Navigo(root, useHash, hash);

    export default {
        data() {
            return {
                currentView: App
            }
        },
        created() {
            let self = this;
            router
                .on('/', function() {
                    self.currentView = App;
                })
                .on('/users', function() {
                    self.currentView = Users;
                })
                .resolve();
        },
        methods: {
          go: function(dest) {
            router.navigate(dest);
            return false;
          }
        }
    }
</script>

<style></style>