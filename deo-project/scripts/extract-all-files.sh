

echo "🤖 Extraction automatique de tous les fichiers..."
mkdir -p extracted


echo "📊 Analyse du fichier source..."
TOTAL_BLOCKS=$(grep -n "'''" "DOC-20251122-WA0009." | wc -l)
echo "Blocs trouvés: $((TOTAL_BLOCKS / 2))"


LINE_NUM=1
while read -r line; do
    if  $line == *"'''javascript"*  ||  $line == *"'''json"*  ||  $line == *"'''sql"* ; then
        START=$LINE_NUM
        FILE_TYPE=$(echo "$line" | sed "s/'''//g" | tr -d '[:space:]')
    elif  $line == "'''" ; then
        if [ ! -z "$START" ]; then
            END=$LINE_NUM
            sed -n "$((START+1)),$((END-1))p" "DOC-20251122-WA0009." > "extracted/block_${START}.txt"
            echo "✅ extracted/block_${START}.txt"
            START=""
        fi
    fi
    ((LINE_NUM++))
done < "DOC-20251122-WA0009."

echo "🎉 Extraction terminée !"
