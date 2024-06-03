for i in {1..10}
do
    # full
    cd ./Original
    bash ./run.sh
    cd ..

    # compare
    cd ./Stubbed_Compare
    bash ./run.sh
    cd ..

    # GetArticles
    cd ./Stubbed_GetArticles
    bash ./run.sh
    cd ..

    # Hash
    cd ./Stubbed_Hash
    bash ./run.sh
    cd ..
done

