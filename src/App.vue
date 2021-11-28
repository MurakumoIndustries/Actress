<template>
    <div>
        <Nav />
        <Actress />
    </div>
</template>

<script>
import Konami from "konami";

import Nav from "./components/Nav.vue";
import Actress from "./components/Actress.vue";

export default {
    created: function() {
        var $this = this;
        new Konami(function() {
            $this.$store.commit(
                "setExperimentalMode",
                !$this.$store.state.isExperimentalMode
            );
        });
    },
    components: {
        Nav,
        Actress
    }
};
</script>