<script>
import { h } from "vue";
const DynamicHeading = (props, context) => {
    return h(`h${props.level}`, context.attrs, context.slots);
};
export default DynamicHeading;
</script>
