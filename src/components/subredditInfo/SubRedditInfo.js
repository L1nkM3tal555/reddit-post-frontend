import { FormattedMessage } from "react-intl";

function SubRedditInfo (){
    return (
        <div>
            <div>
                <h3>r/programming</h3>
                <p>Created Feb 28, 2006</p>
                <p>5,7m Members</p>
                <p>3k Online</p>
                <p>Top 1% Ranked by Size</p>
            </div>
            <div>
                <h3>r/programming Rules</h3>
                <ol>
                    <li><FormattedMessage id="rule1"/></li>
                    <li><FormattedMessage id="rule2"/></li>
                    <li><FormattedMessage id="rule3"/></li>
                    <li><FormattedMessage id="rule4"/></li>
                    <li><FormattedMessage id="rule5"/></li>
                </ol>
            </div>
        </div>
    );
}
export default SubRedditInfo;