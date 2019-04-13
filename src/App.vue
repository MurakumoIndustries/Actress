<template>
    <div>
        <Nav/>
        <Actress/>
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Actress from "./components/Actress.vue";

export default {
    components: {
        Nav,
        Actress
    }
};
</script>