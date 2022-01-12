import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetch } from "../../redux/shop/shop.selectors";
import { WithSpinner } from "../with-spinner/with-spinner";
import CollectionOverview from "./collection-overview";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetch
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionsOverviewContainer;