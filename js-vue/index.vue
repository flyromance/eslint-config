<template>
    <div>123</div>
</template>

<script>
const a = 123;

/**
 * @returns {undefined}
 */
async function aa() {
    await console.log(123);
}
export default {
    data() {
        aa;
        return {};
    }
};
</script>