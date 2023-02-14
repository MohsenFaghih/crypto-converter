import styled from "styled-components";

export const RootConverter = styled.main`
    margin: 40px auto;
    padding: 40px;
    width: auto;
    display: flex;
    flex-direction: column;
    background-color: #8080801f;

    & div.dropdowns{
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-width: 450px;
        margin: auto;
        min-height: auto;

        @media only screen and (max-width: 550px){
            flex-direction: column;
            min-height: 160px;
            min-width: auto;
        }

        & div.countDiv{
            display: flex;
            align-items: center;

            @media only screen and (max-width: 550px){
                justify-content: space-between;
                width: 100%;
            }

            & input.number{
                border: 1px solid #d1d5db;
                padding: 0.75rem 1rem;
                border-radius: 0.375rem;
                width: 50px;

                @media only screen and (max-width: 550px){
                    width: 110px;
                }
            }
    
            & span{
                font-weight: bold;
                padding: 5px;
            }
        }
    }

    & div.showPrice{
        display: flex;
        flex-direction: row;
        margin: 30px auto 20px;
        justify-content: space-evenly;
        min-width: 450px;

        @media only screen and (max-width: 550px){
            min-width: auto;
        }

        & span{
            font-weight: bold;
        }
    }

    & div.buttons{
        & button{
            padding: 8px 40px;
            margin: 20px auto 0;
            font-size: 12px;
            border-radius: 0.375rem;
            border: 1px solid #d1d5db;
            background-color: #b3cbff;
            cursor: pointer;
            font-weight: bold;
        }
    }

    & div.priceNow{
        margin-top: 20px;
        color: #75a1ff;

        & span{
            font-weight: bold;
        }

    }
`