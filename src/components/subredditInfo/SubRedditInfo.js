import { FormattedMessage } from "react-intl";
import './SubRedditInfo.css'

function SubRedditInfo (){
    return (
        <div className="subredditinfo">
            <div className="subredditStats">
                <h3>r/programming</h3>
                <div className="actualStats">
                    <img src="/cake-svgrepo-com.svg" id="birthImage"/>
                    <p id="creationDate">Created Feb 28, 2006</p>
                </div>
                
                <div className="actualStats">
                    <p className="stat">5,7m Members</p>
                    <p className="stat">3k Online</p>
                    <p className="stat">Top 1% Ranked by Size</p>
                </div>
                
            </div>
            <div className="rules">
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